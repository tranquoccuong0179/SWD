using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Manim_Model.Migrations
{
    /// <inheritdoc />
    public partial class updateSolution3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolutionOutput_Solutions_SolutionId",
                table: "SolutionOutput");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionParameter_Parameter_ParameterId",
                table: "SolutionParameter");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionParameter_SolutionType_SolutionTypeId",
                table: "SolutionParameter");

            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_SolutionType_SolutionTypeId",
                table: "Solutions");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionType_Problems_ProblemId",
                table: "SolutionType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SolutionType",
                table: "SolutionType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SolutionParameter",
                table: "SolutionParameter");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SolutionOutput",
                table: "SolutionOutput");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Parameter",
                table: "Parameter");

            migrationBuilder.RenameTable(
                name: "SolutionType",
                newName: "SolutionTypes");

            migrationBuilder.RenameTable(
                name: "SolutionParameter",
                newName: "SolutionParameters");

            migrationBuilder.RenameTable(
                name: "SolutionOutput",
                newName: "SolutionOutputs");

            migrationBuilder.RenameTable(
                name: "Parameter",
                newName: "Parameters");

            migrationBuilder.RenameIndex(
                name: "IX_SolutionType_ProblemId",
                table: "SolutionTypes",
                newName: "IX_SolutionTypes_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_SolutionParameter_SolutionTypeId",
                table: "SolutionParameters",
                newName: "IX_SolutionParameters_SolutionTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_SolutionOutput_SolutionId",
                table: "SolutionOutputs",
                newName: "IX_SolutionOutputs_SolutionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SolutionTypes",
                table: "SolutionTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SolutionParameters",
                table: "SolutionParameters",
                columns: new[] { "ParameterId", "SolutionTypeId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SolutionOutputs",
                table: "SolutionOutputs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Parameters",
                table: "Parameters",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionOutputs_Solutions_SolutionId",
                table: "SolutionOutputs",
                column: "SolutionId",
                principalTable: "Solutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionParameters_Parameters_ParameterId",
                table: "SolutionParameters",
                column: "ParameterId",
                principalTable: "Parameters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionParameters_SolutionTypes_SolutionTypeId",
                table: "SolutionParameters",
                column: "SolutionTypeId",
                principalTable: "SolutionTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_SolutionTypes_SolutionTypeId",
                table: "Solutions",
                column: "SolutionTypeId",
                principalTable: "SolutionTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionTypes_Problems_ProblemId",
                table: "SolutionTypes",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolutionOutputs_Solutions_SolutionId",
                table: "SolutionOutputs");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionParameters_Parameters_ParameterId",
                table: "SolutionParameters");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionParameters_SolutionTypes_SolutionTypeId",
                table: "SolutionParameters");

            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_SolutionTypes_SolutionTypeId",
                table: "Solutions");

            migrationBuilder.DropForeignKey(
                name: "FK_SolutionTypes_Problems_ProblemId",
                table: "SolutionTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SolutionTypes",
                table: "SolutionTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SolutionParameters",
                table: "SolutionParameters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SolutionOutputs",
                table: "SolutionOutputs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Parameters",
                table: "Parameters");

            migrationBuilder.RenameTable(
                name: "SolutionTypes",
                newName: "SolutionType");

            migrationBuilder.RenameTable(
                name: "SolutionParameters",
                newName: "SolutionParameter");

            migrationBuilder.RenameTable(
                name: "SolutionOutputs",
                newName: "SolutionOutput");

            migrationBuilder.RenameTable(
                name: "Parameters",
                newName: "Parameter");

            migrationBuilder.RenameIndex(
                name: "IX_SolutionTypes_ProblemId",
                table: "SolutionType",
                newName: "IX_SolutionType_ProblemId");

            migrationBuilder.RenameIndex(
                name: "IX_SolutionParameters_SolutionTypeId",
                table: "SolutionParameter",
                newName: "IX_SolutionParameter_SolutionTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_SolutionOutputs_SolutionId",
                table: "SolutionOutput",
                newName: "IX_SolutionOutput_SolutionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SolutionType",
                table: "SolutionType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SolutionParameter",
                table: "SolutionParameter",
                columns: new[] { "ParameterId", "SolutionTypeId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SolutionOutput",
                table: "SolutionOutput",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Parameter",
                table: "Parameter",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionOutput_Solutions_SolutionId",
                table: "SolutionOutput",
                column: "SolutionId",
                principalTable: "Solutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionParameter_Parameter_ParameterId",
                table: "SolutionParameter",
                column: "ParameterId",
                principalTable: "Parameter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionParameter_SolutionType_SolutionTypeId",
                table: "SolutionParameter",
                column: "SolutionTypeId",
                principalTable: "SolutionType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_SolutionType_SolutionTypeId",
                table: "Solutions",
                column: "SolutionTypeId",
                principalTable: "SolutionType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolutionType_Problems_ProblemId",
                table: "SolutionType",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
