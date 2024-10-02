#nullable disable
using Microsoft.EntityFrameworkCore.Migrations;

namespace SWD392.Manim.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class updateSolution4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_Users_UserId1",
                table: "Solutions");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_UserId1",
                table: "Solutions");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Solutions");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Solutions",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_UserId",
                table: "Solutions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_Users_UserId",
                table: "Solutions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_Users_UserId",
                table: "Solutions");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_UserId",
                table: "Solutions");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Solutions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "Solutions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_UserId1",
                table: "Solutions",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_Users_UserId1",
                table: "Solutions",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
