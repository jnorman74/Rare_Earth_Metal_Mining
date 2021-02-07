-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/cjLvSq
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Sample" (
    "sample_id" INT   NOT NULL,
    "sample_name" VARCHAR   NOT NULL,
    "latitude" NUMERIC   NOT NULL,
    "longitude" NUMERIC   NOT NULL,
    "rock_name" VARCHAR   NOT NULL,
    "quartz" NUMERIC   NOT NULL,
    "feldspar" NUMERIC   NOT NULL,
    "lithics" NUMERIC   NOT NULL,
    "p_velocity" NUMERIC   NOT NULL,
    "density_model" NUMERIC   NOT NULL,
    "heat_production" NUMERIC   NOT NULL,
    "heat_production_mass" NUMERIC   NOT NULL,
    "trace_id" INT   NOT NULL,
    "iso_id" INT   NOT NULL,
    "comp_id" INT   NOT NULL,
    "major_id" INT   NOT NULL,
    "rgroup_id" INT   NOT NULL,
    "age_id" INT   NOT NULL,
    "country_id" INT   NOT NULL,
    CONSTRAINT "pk_Sample" PRIMARY KEY (
        "sample_id"
     )
);

CREATE TABLE "Trace" (
    "trace_id" INT   NOT NULL,
    "f_ppm" NUMERIC   NOT NULL,
    "cl_ppm" NUMERIC   NOT NULL,
    "br__ppm" NUMERIC   NOT NULL,
    "i_ppm" NUMERIC   NOT NULL,
    "h_ppm" NUMERIC   NOT NULL,
    "c_ppm" NUMERIC   NOT NULL,
    "n_ppm" NUMERIC   NOT NULL,
    "p_ppm" NUMERIC   NOT NULL,
    "s_ppm" NUMERIC   NOT NULL,
    "al_ppm" NUMERIC   NOT NULL,
    "as_ppm" NUMERIC   NOT NULL,
    "ag_ppm" NUMERIC   NOT NULL,
    "au_ppm" NUMERIC   NOT NULL,
    "b_ppm" NUMERIC   NOT NULL,
    "ba_ppm" NUMERIC   NOT NULL,
    "be_ppm" NUMERIC   NOT NULL,
    "bi_ppm" NUMERIC   NOT NULL,
    "ca_ppm" NUMERIC   NOT NULL,
    "cd_ppm" NUMERIC   NOT NULL,
    "ce_ppm" NUMERIC   NOT NULL,
    "co_ppm" NUMERIC   NOT NULL,
    "cr_ppm" NUMERIC   NOT NULL,
    "cs_ppm" NUMERIC   NOT NULL,
    "dy_ppm" NUMERIC   NOT NULL,
    "er_ppm" NUMERIC   NOT NULL,
    "eu_ppm" NUMERIC   NOT NULL,
    "fe_ppm" NUMERIC   NOT NULL,
    "ga_ppm" NUMERIC   NOT NULL,
    "gd_ppm" NUMERIC   NOT NULL,
    "ge_ppm" NUMERIC   NOT NULL,
    "hf_ppm" NUMERIC   NOT NULL,
    "hg_ppm" NUMERIC   NOT NULL,
    "ho_ppm" NUMERIC   NOT NULL,
    "in_ppm" NUMERIC   NOT NULL,
    "ir_ppm" NUMERIC   NOT NULL,
    "k_ppm" NUMERIC   NOT NULL,
    "la_ppm" NUMERIC   NOT NULL,
    "li_ppm" NUMERIC   NOT NULL,
    "lu_ppm" NUMERIC   NOT NULL,
    "mg_ppm" NUMERIC   NOT NULL,
    "mn_ppm" NUMERIC   NOT NULL,
    "mo_ppm" NUMERIC   NOT NULL,
    "na_ppm" NUMERIC   NOT NULL,
    "nd_ppm" NUMERIC   NOT NULL,
    "ni_ppm" NUMERIC   NOT NULL,
    "nb_ppm" NUMERIC   NOT NULL,
    "os_ppm" NUMERIC   NOT NULL,
    "pa_ppm" NUMERIC   NOT NULL,
    "pb_ppm" NUMERIC   NOT NULL,
    "pd_ppm" NUMERIC   NOT NULL,
    "pm_ppm" NUMERIC   NOT NULL,
    "pr_ppm" NUMERIC   NOT NULL,
    "pt_ppm" NUMERIC   NOT NULL,
    "rb_ppm" NUMERIC   NOT NULL,
    "re_ppm" NUMERIC   NOT NULL,
    "rh_ppm" NUMERIC   NOT NULL,
    "ru_ppm" NUMERIC   NOT NULL,
    "sb_ppm" NUMERIC   NOT NULL,
    "sc_ppm" NUMERIC   NOT NULL,
    "se_ppm" NUMERIC   NOT NULL,
    "si_ppm" NUMERIC   NOT NULL,
    "sm_ppm" NUMERIC   NOT NULL,
    "sn_ppm" NUMERIC   NOT NULL,
    "sr_ppm" NUMERIC   NOT NULL,
    "ta_ppm" NUMERIC   NOT NULL,
    "tb_ppm" NUMERIC   NOT NULL,
    "te_ppm" NUMERIC   NOT NULL,
    "th_ppm" NUMERIC   NOT NULL,
    "ti_ppm" NUMERIC   NOT NULL,
    "tl_ppm" NUMERIC   NOT NULL,
    "tm_ppm" NUMERIC   NOT NULL,
    "w_ppm" NUMERIC   NOT NULL,
    "v_ppm" NUMERIC   NOT NULL,
    "u_ppm" NUMERIC   NOT NULL,
    "y_ppm" NUMERIC   NOT NULL,
    "yb_ppm" NUMERIC   NOT NULL,
    "zn_ppm" NUMERIC   NOT NULL,
    "zr_ppm" NUMERIC   NOT NULL,
    CONSTRAINT "pk_Trace" PRIMARY KEY (
        "trace_id"
     )
);

CREATE TABLE "Isotope" (
    "iso_id" INT   NOT NULL,
    "rb87_sr86" NUMERIC   NOT NULL,
    "sr87_sr86" NUMERIC   NOT NULL,
    "nd143_nd144" NUMERIC   NOT NULL,
    "sm147_nd144" NUMERIC   NOT NULL,
    "lu176_hf177" NUMERIC   NOT NULL,
    "hf176_hf177" NUMERIC   NOT NULL,
    "re187_os186" NUMERIC   NOT NULL,
    "re187_os188" NUMERIC   NOT NULL,
    "os187_os188" NUMERIC   NOT NULL,
    "pb206_pb204" NUMERIC   NOT NULL,
    "pb207_pb204" NUMERIC   NOT NULL,
    "pb208_pb204" NUMERIC   NOT NULL,
    "th232_pb204" NUMERIC   NOT NULL,
    "th232_u238" NUMERIC   NOT NULL,
    "u238_pb204" NUMERIC   NOT NULL,
    "epsilon_hf" NUMERIC   NOT NULL,
    "epsilon_nd" NUMERIC   NOT NULL,
    "epsilon_sr" NUMERIC   NOT NULL,
    CONSTRAINT "pk_Isotope" PRIMARY KEY (
        "iso_id"
     )
);

CREATE TABLE "Computed" (
    "comp_id" INT   NOT NULL,
    "mali" NUMERIC   NOT NULL,
    "asi" NUMERIC   NOT NULL,
    "malicity" NUMERIC   NOT NULL,
    "cia" NUMERIC   NOT NULL,
    "wip" NUMERIC   NOT NULL,
    "spar" NUMERIC   NOT NULL,
    "qtzindex" NUMERIC   NOT NULL,
    "r1" NUMERIC   NOT NULL,
    "r2" NUMERIC   NOT NULL,
    CONSTRAINT "pk_Computed" PRIMARY KEY (
        "comp_id"
     )
);

CREATE TABLE "Major" (
    "major_id" INT   NOT NULL,
    "sio2" NUMERIC   NOT NULL,
    "tio2" NUMERIC   NOT NULL,
    "al2o3" NUMERIC   NOT NULL,
    "cr2o3" NUMERIC   NOT NULL,
    "fe2o3" NUMERIC   NOT NULL,
    "fe2o3_tot" NUMERIC   NOT NULL,
    "feo" NUMERIC   NOT NULL,
    "feo_tot" NUMERIC   NOT NULL,
    "mgo" NUMERIC   NOT NULL,
    "cao" NUMERIC   NOT NULL,
    "mno" NUMERIC   NOT NULL,
    "nio" NUMERIC   NOT NULL,
    "k2o" NUMERIC   NOT NULL,
    "na2o" NUMERIC   NOT NULL,
    "sro" NUMERIC   NOT NULL,
    "p2o5" NUMERIC   NOT NULL,
    "h2o_plus" NUMERIC   NOT NULL,
    "h2o_minus" NUMERIC   NOT NULL,
    "h2o_tot" NUMERIC   NOT NULL,
    "co2" NUMERIC   NOT NULL,
    "so3" NUMERIC   NOT NULL,
    "bao" NUMERIC   NOT NULL,
    "caco3" NUMERIC   NOT NULL,
    "mgco3" NUMERIC   NOT NULL,
    "loi" NUMERIC   NOT NULL,
    CONSTRAINT "pk_Major" PRIMARY KEY (
        "major_id"
     )
);

CREATE TABLE "Rockgroup" (
    "rgroup_id" INT   NOT NULL,
    "rock_group" VARCHAR   NOT NULL,
    "rock_origin" VARCHAR   NOT NULL,
    "rock_facies" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Rockgroup" PRIMARY KEY (
        "rgroup_id"
     )
);

CREATE TABLE "Age" (
    "age_id" INT   NOT NULL,
    "age_min" NUMERIC   NOT NULL,
    "age" NUMERIC   NOT NULL,
    "age_max" NUMERIC   NOT NULL,
    "age_sd" NUMERIC   NOT NULL,
    "time_period_min" VARCHAR   NOT NULL,
    "time_period" VARCHAR   NOT NULL,
    "time_period_max" VARCHAR   NOT NULL,
    "age_method" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Age" PRIMARY KEY (
        "age_id"
     )
);

CREATE TABLE "Country" (
    "country_id" INT   NOT NULL,
    "country" VARCHAR(2)   NOT NULL,
    CONSTRAINT "pk_Country" PRIMARY KEY (
        "country_id"
     )
);

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_trace_id" FOREIGN KEY("trace_id")
REFERENCES "Trace" ("trace_id");

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_iso_id" FOREIGN KEY("iso_id")
REFERENCES "Isotope" ("iso_id");

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_comp_id" FOREIGN KEY("comp_id")
REFERENCES "Computed" ("comp_id");

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_major_id" FOREIGN KEY("major_id")
REFERENCES "Major" ("major_id");

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_rgroup_id" FOREIGN KEY("rgroup_id")
REFERENCES "Rockgroup" ("rgroup_id");

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_age_id" FOREIGN KEY("age_id")
REFERENCES "Age" ("age_id");

ALTER TABLE "Sample" ADD CONSTRAINT "fk_Sample_country_id" FOREIGN KEY("country_id")
REFERENCES "Country" ("country_id");

