using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Manim_Model.Migrations
{
    /// <inheritdoc />
    public partial class updateEntitySolution1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parameter",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parameter", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionParameter_Parameter_ParameterId",
                table: "SolutionParameter",
                column: "ParameterId",
                principalTable: "Parameter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolutionParameter_Parameter_ParameterId",
                table: "SolutionParameter");

            migrationBuilder.DropTable(
                name: "Parameter");
        }
    }
}
