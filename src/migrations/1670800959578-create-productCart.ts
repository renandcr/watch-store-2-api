import { MigrationInterface, QueryRunner } from "typeorm";

export class createProductCart1670800959578 implements MigrationInterface {
    name = 'createProductCart1670800959578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "units" integer NOT NULL, "productsId" uuid, "cartId" uuid, CONSTRAINT "PK_a9eb3c6b183961debec3a968f91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_5f2d0566abad474187e27a27803" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_5f2d0566abad474187e27a27803"`);
        await queryRunner.query(`DROP TABLE "product_cart"`);
    }

}
