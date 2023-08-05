export const usersList = async (data: any) => {
    try {
        return {
            code: 200,
            status: true,
            message: 'success'
        }
    } catch (e:any) {
        return {
            code: 500,
            status: false,
            message: e.message
        }
    }
}
