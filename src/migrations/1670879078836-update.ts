import { MigrationInterface, QueryRunner } from "typeorm";

export class update1670879078836 implements MigrationInterface {
    name = 'update1670879078836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "purchase_units"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "purchase_units" integer NOT NULL DEFAULT '1'`);
    }

}
