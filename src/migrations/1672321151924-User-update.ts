import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdate1672321151924 implements MigrationInterface {
    name = 'UserUpdate1672321151924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_aa087eea503f33b9150558c7ab2"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_e3292b9fe0788404b5cc3b4efd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "product_cart" RENAME COLUMN "userId" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" RENAME COLUMN "userId" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "userId" TO "customerId"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "cartId" uuid, CONSTRAINT "REL_cd1c7a6202ec10674e4173ce1b" UNIQUE ("cartId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_08ba83a830d66e8f3825cc9fa63" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_0de16310f3bbd13a4fae3fc1d38" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_cd1c7a6202ec10674e4173ce1bf" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_cd1c7a6202ec10674e4173ce1bf"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_0de16310f3bbd13a4fae3fc1d38"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_08ba83a830d66e8f3825cc9fa63"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "customerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "purchase_order" RENAME COLUMN "customerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "product_cart" RENAME COLUMN "customerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_e3292b9fe0788404b5cc3b4efd5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_aa087eea503f33b9150558c7ab2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
