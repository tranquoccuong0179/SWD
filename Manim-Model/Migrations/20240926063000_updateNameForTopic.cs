using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Manim_Model.Migrations
{
    /// <inheritdoc />
    public partial class updateNameForTopic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Topics");
        }
    }
}
