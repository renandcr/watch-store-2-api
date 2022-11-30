import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProduct1669753258984 implements MigrationInterface {
    name = 'updateProduct1669753258984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "reference" character varying(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "reference"`);
    }

}
