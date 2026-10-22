use std::error::Error;
use toasty_cli::{Config, ToastyCli};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let config = Config::load()?;
    let models = meta_lib::models();
    let db = toasty::Db::builder()
        .models(models)
        .connect("sqlite:./metatron.db")
        .await?;

    let cli = ToastyCli::with_config(db, config);
    cli.parse_and_run().await?;
    Ok(())
}
