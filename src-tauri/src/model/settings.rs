use serde::{Deserialize, Serialize};
use toasty::{Json, Model};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub enum Theme {
    System,
    Light,
    Dark,
}

#[derive(Debug, Model)]
pub struct Settings {
    #[key]
    #[auto]
    pub id: Uuid,
    #[column(type = text)]
    #[default(Json(Theme::System))]
    pub theme: Json<Theme>,
    #[default(true)]
    pub sidebar: bool,
    #[default(false)]
    pub update: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Gender {
    Male,
    Female,
    Unknown,
}

#[derive(Debug, Model)]
pub struct Account {
    #[key]
    #[auto]
    pub id: Uuid,
    #[default(String::from("默认"))]
    pub name: String,
    #[column(type = text)]
    #[default(Json(Gender::Female))]
    pub gender: Json<Gender>,
    #[default(true)]
    pub enable: bool,
}