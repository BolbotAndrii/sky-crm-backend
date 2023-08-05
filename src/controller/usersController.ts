const {usersList} = require('../services/usersService.js')
export const getUsersList  = async (req:any, res:any) => {
    try {
        const result = await usersList(req)
        return res.status(result.code).json(result)
    } catch (e:any) {
        return res.status(500).json({message: e.message})
    }
}

// module.exports = {getUsersList}