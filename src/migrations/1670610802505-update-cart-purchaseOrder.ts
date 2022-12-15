import { MigrationInterface, QueryRunner } from "typeorm";

export class updateCartPurchaseOrder1670610802505 implements MigrationInterface {
    name = 'updateCartPurchaseOrder1670610802505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "shipping"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD "shipping" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP COLUMN "shipping"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "shipping" integer NOT NULL`);
    }

}
