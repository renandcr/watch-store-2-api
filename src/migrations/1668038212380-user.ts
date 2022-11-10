import { MigrationInterface, QueryRunner } from "typeorm";

export class user1668038212380 implements MigrationInterface {
    name = 'user1668038212380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
