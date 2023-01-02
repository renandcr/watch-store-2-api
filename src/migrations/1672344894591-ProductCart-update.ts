import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCartUpdate1672344894591 implements MigrationInterface {
    name = 'ProductCartUpdate1672344894591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" ADD "final_price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP COLUMN "final_price"`);
    }

}
