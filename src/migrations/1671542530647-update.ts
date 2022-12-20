import { MigrationInterface, QueryRunner } from "typeorm";

export class update1671542530647 implements MigrationInterface {
    name = 'update1671542530647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
