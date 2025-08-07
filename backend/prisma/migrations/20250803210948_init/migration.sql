-- CreateTable
CREATE TABLE "public"."Barber" (
    "barber_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirm_Password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT,
    "otp_expiry" TIMESTAMP(3),
    "shopValidation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barber_pkey" PRIMARY KEY ("barber_id")
);

-- CreateTable
CREATE TABLE "public"."ShopDetails" (
    "shop_id" SERIAL NOT NULL,
    "barber_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT,
    "gst_number" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopDetails_pkey" PRIMARY KEY ("shop_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barber_email_key" ON "public"."Barber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_phone_key" ON "public"."Barber"("phone");

-- AddForeignKey
ALTER TABLE "public"."ShopDetails" ADD CONSTRAINT "ShopDetails_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "public"."Barber"("barber_id") ON DELETE CASCADE ON UPDATE CASCADE;
