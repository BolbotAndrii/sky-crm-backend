import { lead_model as Lead } from '../models/leads_model.js'
const getAnalyticsByLeads = async (data: any) => {
  let { offer, country } = data.query
  const filterOptions = []

  if (data.query.from && data.query.to) {
    filterOptions.push({
      created_at: {
        $gte: new Date(data.query.from + 'T00:00:00.000+00:00'),
        $lte: new Date(data.query.to + 'T23:59:59.999+00:00'),
      },
    })
  }

  if (offer) {
    if (typeof offer === 'string') {
      offer = [offer]
    }
    filterOptions.push({ offer: { $in: offer.map((item: string) => item.toLowerCase()) } })
  }

  if (country) {
    if (typeof country === 'string') {
      country = [country]
    }
    filterOptions.push({ country: { $in: country.map((item: string) => item.toUpperCase()) } })
  }

  const leads = await Lead.find({
    $and: filterOptions,
  }).lean()

  return {
    total: leads.length,
  }
}

const getAnalyticsByAffiliate = async (data: any) => {}

export { getAnalyticsByLeads, getAnalyticsByAffiliate }
