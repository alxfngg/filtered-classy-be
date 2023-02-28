import { UserModel } from '../model/user.model';

export const getUsers = async () => {
    const users = await UserModel.find({});
    return users;
}

export const getUser = async (id: string) => {
    let user;
    try {
        user = await UserModel.findOne({ _id: id })
        .populate({
            path: 'student',
            populate: [
            { path: 'coursesTaken'},
            { path: 'currentCourses'},
            { path: 'shoppingCart'}
            ]
        })
        .populate('student')
        .populate('professor')
        console.log('the user is', user)
    }
    catch (err) {
        console.log('Error getting user', err);
    }
    return user;
}

export const createUser = async (user: object) => {
    let data = {};
    try {
        data = await UserModel.create(user);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateUser = async (id: string, user: object) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, user, { new: true }) as object;
        return updatedUser;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteUser = async (id: string) => {
    try {
        let userDeleted: object = await UserModel.findById(id) as object;
        let deletedCount: number = await (await UserModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { userDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}