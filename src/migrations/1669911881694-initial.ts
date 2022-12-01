import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1669911881694 implements MigrationInterface {
    name = 'initial1669911881694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "purchase_units" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "purchase_units" DROP NOT NULL`);
    }

}
