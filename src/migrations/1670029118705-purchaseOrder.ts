import { MigrationInterface, QueryRunner } from "typeorm";

export class purchaseOrder1670029118705 implements MigrationInterface {
    name = 'purchaseOrder1670029118705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchase_units" integer NOT NULL, "total_price" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_ad3e1c7b862f4043b103a6c8c60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_order_products_product" ("purchaseOrderId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_8c8d07beb28b5cfcec40239eab9" PRIMARY KEY ("purchaseOrderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d7d0d616b2e0034c82e24505b" ON "purchase_order_products_product" ("purchaseOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8d24ed2bf368d116b61a965f0" ON "purchase_order_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e3292b9fe0788404b5cc3b4efd5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" ADD CONSTRAINT "FK_4d7d0d616b2e0034c82e24505b6" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" ADD CONSTRAINT "FK_e8d24ed2bf368d116b61a965f0f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" DROP CONSTRAINT "FK_e8d24ed2bf368d116b61a965f0f"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" DROP CONSTRAINT "FK_4d7d0d616b2e0034c82e24505b6"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e3292b9fe0788404b5cc3b4efd5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8d24ed2bf368d116b61a965f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d7d0d616b2e0034c82e24505b"`);
        await queryRunner.query(`DROP TABLE "purchase_order_products_product"`);
        await queryRunner.query(`DROP TABLE "purchase_order"`);
    }

}
