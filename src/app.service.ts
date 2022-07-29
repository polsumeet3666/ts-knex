import { Injectable } from '@nestjs/common';

import { Knex, knex } from 'knex';

// import * as User from './users.entity';
// declare module 'knex/types/tables' {
//   interface User {
//     first_name: string;
//     last_name: string;
//   }
//   interface Tables {
//     users: User;
//   }
// }

// interface User {
//   first_name: string;
//   last_name: string;
// }
// interface Tables {
//   users: User;
// }
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class AppService {
  private knexInstance;
  private config: Knex.Config = {
    client: 'pg',
    connection: 'postgresql://postgres:example@localhost:5432/postgres',
  };

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.knexInstance = knex(this.config);
    this.knexInstance.migrate.latest().then(function () {
      console.log('knex migration done');
    });
  }
  async getHello(): Promise<string> {
    // example insert
    // let user:User = {
    //   first_name: 'sumeet',
    //   last_name: 'pol',
    // };

    // let r = await this.knexInstance('users').insert(user);
    // console.log(r);
    // return 'done';

    // example read
    // let r =  await this.knexInstance('users').where('id',0);

    // try {
    //   let r = await knex('users').select<User.User>();
    //   console.log(r);
    //   return 'done';
    // } catch (error) {
    //   console.log(error);
    //   return 'err';
    // }
    let r =  await this.usersRepository.find();
    console.log(r);
    return "dine";
  }
}
