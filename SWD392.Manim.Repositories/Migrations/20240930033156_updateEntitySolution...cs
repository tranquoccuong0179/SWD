#nullable disable

namespace SWD392.Manim.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class updateEntitySolution : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_ProblemTypes_ProblemTypeId",
                table: "Solutions");

            migrationBuilder.DropTable(
                name: "ProblemTypes");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_ProblemTypeId",
                table: "Solutions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "ProblemTypeId",
                table: "Solutions",
                newName: "SolutionTypeId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Wallets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Problems",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TopicId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Problems_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SolutionOutput",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SolutionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolutionOutput", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SolutionOutput_Solutions_SolutionId",
                        column: x => x.SolutionId,
                        principalTable: "Solutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SolutionType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProblemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolutionType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SolutionType_Problems_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SolutionParameter",
                columns: table => new
                {
                    ParameterId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SolutionTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolutionParameter", x => new { x.ParameterId, x.SolutionTypeId });
                    table.ForeignKey(
                        name: "FK_SolutionParameter_SolutionType_SolutionTypeId",
                        column: x => x.SolutionTypeId,
                        principalTable: "SolutionType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_SolutionTypeId",
                table: "Solutions",
                column: "SolutionTypeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Problems_TopicId",
                table: "Problems",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_SolutionOutput_SolutionId",
                table: "SolutionOutput",
                column: "SolutionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SolutionParameter_SolutionTypeId",
                table: "SolutionParameter",
                column: "SolutionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SolutionType_ProblemId",
                table: "SolutionType",
                column: "ProblemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_SolutionType_SolutionTypeId",
                table: "Solutions",
                column: "SolutionTypeId",
                principalTable: "SolutionType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Solutions_SolutionType_SolutionTypeId",
                table: "Solutions");

            migrationBuilder.DropTable(
                name: "SolutionOutput");

            migrationBuilder.DropTable(
                name: "SolutionParameter");

            migrationBuilder.DropTable(
                name: "SolutionType");

            migrationBuilder.DropTable(
                name: "Problems");

            migrationBuilder.DropIndex(
                name: "IX_Solutions_SolutionTypeId",
                table: "Solutions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Wallets");

            migrationBuilder.RenameColumn(
                name: "SolutionTypeId",
                table: "Solutions",
                newName: "ProblemTypeId");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProblemTypes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TopicId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProblemTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProblemTypes_Topics_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_ProblemTypeId",
                table: "Solutions",
                column: "ProblemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProblemTypes_TopicId",
                table: "ProblemTypes",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Solutions_ProblemTypes_ProblemTypeId",
                table: "Solutions",
                column: "ProblemTypeId",
                principalTable: "ProblemTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
