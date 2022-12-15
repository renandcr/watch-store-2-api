import { MigrationInterface, QueryRunner } from "typeorm";

export class initialGenerate1670543491819 implements MigrationInterface {
    name = 'initialGenerate1670543491819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reference" character varying(150) NOT NULL, "img" character varying NOT NULL, "description" character varying(150) NOT NULL, "price" double precision NOT NULL, "stock_quantity" integer NOT NULL, "purchase_units" integer NOT NULL DEFAULT '1', "category" character varying(50) NOT NULL, "genre" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchase_units" integer NOT NULL, "total_price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_ad3e1c7b862f4043b103a6c8c60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_units" integer NOT NULL, "amount" double precision NOT NULL, "shipping" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "cartId" uuid, CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(50) NOT NULL, "district" character varying(50) NOT NULL, "house_number" character varying(10) NOT NULL, "complement" character varying(50), "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "zip_code" character varying(8) NOT NULL, "phone" character varying(14) NOT NULL, "main" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_order_products_product" ("purchaseOrderId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_8c8d07beb28b5cfcec40239eab9" PRIMARY KEY ("purchaseOrderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d7d0d616b2e0034c82e24505b" ON "purchase_order_products_product" ("purchaseOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8d24ed2bf368d116b61a965f0" ON "purchase_order_products_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "cart_products_product" ("cartId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_785ab9c1dbede19ef42bf12280b" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e6ce39be5d354954a88ded1eba" ON "cart_products_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0fc996e42b6330c97f8cffbddf" ON "cart_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e3292b9fe0788404b5cc3b4efd5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" ADD CONSTRAINT "FK_4d7d0d616b2e0034c82e24505b6" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" ADD CONSTRAINT "FK_e8d24ed2bf368d116b61a965f0f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" DROP CONSTRAINT "FK_e8d24ed2bf368d116b61a965f0f"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_products_product" DROP CONSTRAINT "FK_4d7d0d616b2e0034c82e24505b6"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e3292b9fe0788404b5cc3b4efd5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fc996e42b6330c97f8cffbddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6ce39be5d354954a88ded1eba"`);
        await queryRunner.query(`DROP TABLE "cart_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8d24ed2bf368d116b61a965f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d7d0d616b2e0034c82e24505b"`);
        await queryRunner.query(`DROP TABLE "purchase_order_products_product"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "purchase_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
