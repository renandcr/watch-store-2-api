import { MigrationInterface, QueryRunner } from "typeorm";

export class update1671548910471 implements MigrationInterface {
    name = 'update1671548910471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_756f53ab9466eb52a52619ee019" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
