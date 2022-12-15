import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePurchaseOrder1670613697613 implements MigrationInterface {
    name = 'updatePurchaseOrder1670613697613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "shipping"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "shipping" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "shipping"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "shipping" integer NOT NULL`);
    }

}
