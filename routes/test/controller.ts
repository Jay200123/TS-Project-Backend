import testService from './service';
import { ErrorHandler, SuccessHandler } from '../../utils';
import { Request, Response, NextFunction } from '../../interface';
import { STATUSCODE } from '../../constants';
import { uploadImage } from '../../utils';
import { cloudinary } from '../../config';
import Test from './model';

const getAllTests = async (req: Request, res: Response, next: NextFunction) => {
    const data = await testService.getAll();
    return !data || data.length === STATUSCODE.ZERO
        ? next(new ErrorHandler('No Tests records found'))
        : SuccessHandler(res, 'Tests data found', data)
};

const getTestById = async (req: Request, res: Response, next: NextFunction) => {
    const data = await testService.getById(req.params.id);
    return !data
        ? next(new ErrorHandler('No Test record found'))
        : SuccessHandler(res, "Test Record found", data)
}

const createTest = async (req: Request, res: Response, next: NextFunction) => {
    const lastTicket = await testService.getOne();  

    let counter: number = 0;
    let ticketNumber: string = "";

    if (lastTicket === null) {
        counter++;
        ticketNumber = `IT-T-${counter}`;
    }

    if (lastTicket) {
        counter = lastTicket?.counter + 1;
        ticketNumber = `IT-T-${counter}`;
    }

    const image = await uploadImage(req.files as Express.Multer.File[], []);

    const data = await testService.Add(
        {
            ...req.body,
            counter: counter,
            ticketNumber: ticketNumber,
            image: image,
        }
    );

    return SuccessHandler(res, 'Test created successfully', data)
}

const updateTestById = async (req: Request, res: Response, next: NextFunction) => {
    const test = await testService.getById(req.params.id);
    const oldImage = Array.isArray(test?.image) ? test.image.map((i) => i?.public_id) : [];


    const image = await uploadImage(req.files as Express.Multer.File[], oldImage);
    const data = await testService.updateById(
        req.params.id,
        {
            ...req.body,
            imag: image,
        }
    );

    return SuccessHandler(res, 'Test updated successfully', data)
}

const deleteTestById = async (req: Request, res: Response, next: NextFunction) => {
    const test = await testService.getById(req.params.id);
    const testImage = Array.isArray(test?.image) ? test.image.map((i) => i?.public_id) : [];
    await cloudinary.api.delete_resources(testImage)

    const data = await testService.deleteById(req.params.id);

    return next(SuccessHandler(res, 'Test deleted successfully', data))
}

export {
    getAllTests,
    getTestById,
    createTest,
    updateTestById,
    deleteTestById
}