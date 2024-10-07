using NLog.Web;
using SWD392.Manim.API.Constants;
using SWD392.Manim.API.Converter;
using SWD392.Manim.API.Extensions;
using SWD392.Manim.API.Middlewares;
using SWD392.Manim.Repository.ViewModel.Wallet;
using SWD392.Manim.Services;
using System.Text.Json.Serialization;

var logger = NLog.LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"))
    .GetCurrentClassLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();
    // Add services to the container.
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: CorsConstant.PolicyName,
            policy => { policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod(); });
    });
    builder.Services.AddControllers().AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        x.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
    });
    builder.Services.AddDatabase();
    builder.Services.AddUnitOfWork();
    builder.Services.AddServices(builder.Configuration);
    builder.Services.AddApplication(builder.Configuration);
    builder.Services.AddGoogleAuthentication();
    builder.Services.AddAuthentication();
    builder.Services.Configure<PayOSSettings>(builder.Configuration.GetSection("PayOS"));
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddConfigSwagger();
    builder.Services.AddSwaggerGen();
    //Auto Mapper
    var app = builder.Build();

    // Configure the HTTP request pipeline.
    //app.UseSwagger(options =>
    //{
    //    options.SerializeAsV2 = true;
    //});
    app.UseSwagger();
    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {

        app.UseSwaggerUI();
    }
    else
    {
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            c.RoutePrefix = string.Empty;
        });
    }

    app.UseMiddleware<ExceptionMiddleware>();
    app.UseMiddleware<PermissionMiddleware>();

    app.UseHttpsRedirection();
    app.UseCors(CorsConstant.PolicyName);
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception exception)
{
    logger.Error(exception, "Stop program because of exception");
}
finally
{
    NLog.LogManager.Shutdown();
}
