// Power Query (M) queries extracted from projet APPLE.pbix - one per source table.
// Step names are in French because Power BI Desktop was used with a French locale.
// The local folder path has been shortened to <local folder>; nothing else was changed.

// ---------- category ----------
let
    Source = Csv.Document(File.Contents("<local folder>\category.csv"),[Delimiter=",", Columns=2, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Type modifié" = Table.TransformColumnTypes(Source,{{"Column1", type text}, {"Column2", type text}}),
    #"En-têtes promus" = Table.PromoteHeaders(#"Type modifié", [PromoteAllScalars=true]),
    #"Type modifié1" = Table.TransformColumnTypes(#"En-têtes promus",{{"category_id", type text}, {"category_name", type text}})
in
    #"Type modifié1"

// ---------- products ----------
let
    Source = Csv.Document(File.Contents("<local folder>\products.csv"),[Delimiter=",", Columns=5, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    #"En-têtes promus" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Type modifié" = Table.TransformColumnTypes(#"En-têtes promus",{{"Product_ID", type text}, {"Product_Name", type text}, {"Category_ID", type text}, {"Launch_Date", type date}, {"Price", Int64.Type}})
in
    #"Type modifié"

// ---------- sales ----------
let
    Source = Csv.Document(File.Contents("<local folder>\sales.csv"),[Delimiter=",", Columns=5, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"En-têtes promus" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Type modifié" = Table.TransformColumnTypes(#"En-têtes promus",{{"sale_id", type text}, {"sale_date", type date}, {"store_id", type text}, {"product_id", type text}, {"quantity", Int64.Type}})
in
    #"Type modifié"

// ---------- stores ----------
let
    Source = Csv.Document(File.Contents("<local folder>\stores.csv"),[Delimiter=",", Columns=4, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Type modifié" = Table.TransformColumnTypes(Source,{{"Column1", type text}, {"Column2", type text}, {"Column3", type text}, {"Column4", type text}}),
    #"En-têtes promus" = Table.PromoteHeaders(#"Type modifié", [PromoteAllScalars=true]),
    #"Type modifié1" = Table.TransformColumnTypes(#"En-têtes promus",{{"Store_ID", type text}, {"Store_Name", type text}, {"City", type text}, {"Country", type text}})
in
    #"Type modifié1"

// ---------- warranty ----------
let
    Source = Csv.Document(File.Contents("<local folder>\warranty.csv"),[Delimiter=",", Columns=4, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"En-têtes promus" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Type modifié" = Table.TransformColumnTypes(#"En-têtes promus",{{"claim_id", type text}, {"claim_date", type date}, {"sale_id", type text}, {"repair_status", type text}})
in
    #"Type modifié"

