import { UserModel } from '../model/user.model';

export const getUsers = async () => {
    const users = await UserModel.find({});
    return users;
}

export const getUser = async (id: string) => {
    const user = await UserModel.find({id: id});
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
        await UserModel.findByIdAndUpdate(id, {
            user: user,
        }, { new: true }) as object;
        const updatedUser: object = await UserModel.findById({ _id: id }) as object;
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