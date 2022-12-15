import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProductCart1670801142187 implements MigrationInterface {
    name = 'updateProductCart1670801142187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" ALTER COLUMN "units" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" ALTER COLUMN "units" DROP DEFAULT`);
    }

}
