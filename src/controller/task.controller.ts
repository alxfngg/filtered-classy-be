import { TaskModel } from '../model/task.model';

export const getTasks = async () => {
    console.log("In getTasks");
    const tasks = await TaskModel.find({});
    console.log('tasks:::', tasks);
    return tasks;
}

export const createTask = async (task: string) => {
    let data = {};
    try {
        console.log("In createTask");
        console.log('task in create task is: ', task);
        console.log(TaskModel);
        data = await TaskModel.create(task);
    } catch (err) {
        console.log('Error::' + err);
    }
    return data;
}

export const updateTask = async (id: string, task: string) => {
    try {
        await TaskModel.findByIdAndUpdate(id, {
            task: task,
        }, { new: true }) as object;
        const updatedTask: object = await TaskModel.findById({ _id: id }) as object;
        return updatedTask;
    } catch (err) {
        console.log('Error::' + err);
    }
}

export const deleteTask = async (id: string) => {
    try {
        let taskDeleted: object = await TaskModel.findById(id) as object;
        let deletedCount: number = await (await TaskModel.deleteOne({ _id: id })).deletedCount;
        if (deletedCount === 1) {
            return { taskDeleted };
        }
    } catch (err) {
        console.log('Error::' + err);
    }
}