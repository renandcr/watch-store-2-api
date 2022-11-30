import { MigrationInterface, QueryRunner } from "typeorm";

export class productUpdate1669728569026 implements MigrationInterface {
    name = 'productUpdate1669728569026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "genre" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "genre"`);
    }

}
