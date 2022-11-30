import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserAndAddress1668973410458 implements MigrationInterface {
    name = 'createUserAndAddress1668973410458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(50) NOT NULL, "district" character varying(50) NOT NULL, "house_number" character varying(10) NOT NULL, "complement" character varying(50), "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, "zip_code" character varying(8) NOT NULL, "phone" character varying(14) NOT NULL, "main" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
