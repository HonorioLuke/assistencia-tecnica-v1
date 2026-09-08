CREATE TABLE "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"telefone" text NOT NULL,
	"email" text NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipamentos" (
	"id" serial PRIMARY KEY NOT NULL,
	"tipo" text NOT NULL,
	"marca" text NOT NULL,
	"modelo" text NOT NULL,
	"serial" text,
	"cliente_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ordens_servico" (
	"id" serial PRIMARY KEY NOT NULL,
	"numero" text NOT NULL,
	"descricao" text NOT NULL,
	"status" text DEFAULT 'Recebido' NOT NULL,
	"valor" numeric(10, 2) DEFAULT '0',
	"equipamento_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"delivered_at" timestamp,
	"prioridade" text DEFAULT 'Normal' NOT NULL,
	"tipo_servico" text,
	"observacao" text,
	CONSTRAINT "ordens_servico_numero_unique" UNIQUE("numero")
);
--> statement-breakpoint
ALTER TABLE "equipamentos" ADD CONSTRAINT "equipamentos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_equipamento_id_equipamentos_id_fk" FOREIGN KEY ("equipamento_id") REFERENCES "public"."equipamentos"("id") ON DELETE no action ON UPDATE no action;