import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateUserBalance1609013031317 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'balance',
      type: 'decimal',
      default: 0.00
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'balance');
  }
}
