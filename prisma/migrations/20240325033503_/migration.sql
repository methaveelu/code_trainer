-- AlterTable
CREATE SEQUENCE questioninfo_order_seq;
ALTER TABLE "QuestionInfo" ALTER COLUMN "order" SET DEFAULT nextval('questioninfo_order_seq');
ALTER SEQUENCE questioninfo_order_seq OWNED BY "QuestionInfo"."order";
