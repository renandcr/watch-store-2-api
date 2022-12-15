import { MigrationInterface, QueryRunner } from "typeorm";

export class update1670884256632 implements MigrationInterface {
    name = 'update1670884256632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_order_products_product_cart" ("purchaseOrderId" uuid NOT NULL, "productCartId" uuid NOT NULL, CONSTRAINT "PK_8bb9858d20d0cdfdbcbc17b1605" PRIMARY KEY ("purchaseOrderId", "productCartId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2db112abad6c5f5d388a709e8d" ON "purchase_order_products_product_cart" ("purchaseOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67dfc3f053cf895ba5f94ffdbd" ON "purchase_order_products_product_cart" ("productCartId") `);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product_cart" ADD CONSTRAINT "FK_2db112abad6c5f5d388a709e8df" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product_cart" ADD CONSTRAINT "FK_67dfc3f053cf895ba5f94ffdbda" FOREIGN KEY ("productCartId") REFERENCES "product_cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product_cart" DROP CONSTRAINT "FK_67dfc3f053cf895ba5f94ffdbda"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product_cart" DROP CONSTRAINT "FK_2db112abad6c5f5d388a709e8df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67dfc3f053cf895ba5f94ffdbd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2db112abad6c5f5d388a709e8d"`);
        await queryRunner.query(`DROP TABLE "purchase_order_products_product_cart"`);
    }

}
