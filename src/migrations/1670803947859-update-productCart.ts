import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProductCart1670803947859 implements MigrationInterface {
    name = 'updateProductCart1670803947859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_5f2d0566abad474187e27a27803"`);
        await queryRunner.query(`ALTER TABLE "product_cart" RENAME COLUMN "productsId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_b636d2066a50d84f73597f168df" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_b636d2066a50d84f73597f168df"`);
        await queryRunner.query(`ALTER TABLE "product_cart" RENAME COLUMN "productId" TO "productsId"`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_5f2d0566abad474187e27a27803" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
