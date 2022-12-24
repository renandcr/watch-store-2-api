import { MigrationInterface, QueryRunner } from "typeorm";

export class update1671901192485 implements MigrationInterface {
    name = 'update1671901192485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "installment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "installment"`);
    }

}
