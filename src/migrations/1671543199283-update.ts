import { MigrationInterface, QueryRunner } from "typeorm";

export class update1671543199283 implements MigrationInterface {
    name = 'update1671543199283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_aa087eea503f33b9150558c7ab2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_aa087eea503f33b9150558c7ab2"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
