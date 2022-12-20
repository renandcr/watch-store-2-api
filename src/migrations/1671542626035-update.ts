import { MigrationInterface, QueryRunner } from "typeorm";

export class update1671542626035 implements MigrationInterface {
    name = 'update1671542626035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_aa087eea503f33b9150558c7ab2"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_aa087eea503f33b9150558c7ab2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
