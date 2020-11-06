using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TestDotNetApp.API.Migrations
{
    public partial class NewCarModelClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", 
                            SqlServerValueGenerationStrategy.IdentityColumn)
                        .Annotation("MySql:ValueGenerationStrategy", 
                            MySqlValueGenerationStrategy.IdentityColumn)   
                        .Annotation("Sqlite:Autoincrement", true),
                    Maker = table.Column<string>(nullable: true),
                    ModelName = table.Column<string>(nullable: true),
                    LevelName = table.Column<string>(nullable: true),
                    EnergyForm = table.Column<string>(nullable: true),
                    DayOfPublish = table.Column<DateTime>(nullable: false),
                    Length = table.Column<int>(nullable: false),
                    Width = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    HorsePower = table.Column<double>(nullable: false),
                    AirbagsNumber = table.Column<int>(nullable: false),
                    BootCapacity = table.Column<double>(nullable: false),
                    SizeAndType = table.Column<string>(nullable: true),
                    FuelConsumption = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", 
                            SqlServerValueGenerationStrategy.IdentityColumn)
                        .Annotation("MySql:ValueGenerationStrategy", 
                            MySqlValueGenerationStrategy.IdentityColumn)   
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false),
                    CarModelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_CarModels_CarModelId",
                        column: x => x.CarModelId,
                        principalTable: "CarModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CarModelId",
                table: "Photos",
                column: "CarModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "CarModels");
        }
    }
}
