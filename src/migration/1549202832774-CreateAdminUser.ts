import { MigrationInterface, QueryRunner } from "typeorm";
import { dataSource } from "../config/dataSource";
import { User, UserRole } from "../entities/user.entity";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    user.email = "admin@admin.com";
    user.password = "admin";
    user.hashPassword();
    user.role = UserRole.ADMIN;
    const userRepository = dataSource.getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
