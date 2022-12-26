import { MigrationInterface, QueryRunner } from "typeorm";

export class update1671901676944 implements MigrationInterface {
    name = 'update1671901676944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "shipping" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "shipping"`);
    }

}
