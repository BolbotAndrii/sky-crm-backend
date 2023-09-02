import { Document, Model, FilterQuery } from 'mongoose'

interface PaginationOptions {
  sort_field?: string
  per_page?: string
  order?: string
  page?: string
  populate?: string
}

interface PaginationResult<T> {
  data: T[]
  meta: { current: number; pageSize: number; total: number; totalPages: number }
}

const defaultSorter = 'created_at'

enum Sorter {
  ASC = 'asc',
  DESC = 'desc',
}

const paginate = <T extends Document>(schema: Model<T>) => {
  schema.statics.paginate = async function (
    filter: FilterQuery<T>,
    options: PaginationOptions,
  ): Promise<PaginationResult<T>> {
    const sort = {}

    if (options.sort_field) {
      sort[options.sort_field] = options.order === Sorter.DESC ? -1 : 1
    } else {
      sort[defaultSorter] = -1
    }

    const limit = options.per_page && parseInt(options.per_page, 10) > 0 ? parseInt(options.per_page, 10) : 10
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1
    const skip = (page - 1) * limit

    const countPromise = this.countDocuments(filter).exec()
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit)

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }), '' as any),
        )
      })
    }

    docsPromise = docsPromise.exec()

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values
      const totalPages = Math.ceil(totalResults / limit)
      const meta: any = {
        current: page,
        pageSize: limit,
        total: totalResults,
        totalPages,
      }
      const result: PaginationResult<T> = {
        data: results,
        meta,
      }
      return Promise.resolve(result)
    })
  }
}

export { paginate }
