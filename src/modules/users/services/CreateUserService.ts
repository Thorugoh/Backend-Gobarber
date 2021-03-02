import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHasProvider';
interface IRequest{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}


    public async execute({name, email, password}: IRequest): Promise<User>{

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists){
            throw new AppError('Email address already used');
        }
        
        const hashedPassword = await this.hashProvider.generatehash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });


        return user;
    }

}

export default CreateUserService;