import pandas as pd
import json

# 读取 Excel，全部当作字符串
df = pd.read_excel("luopin.xlsx", dtype=str)

# 用空字符串填充空值
df = df.fillna('')

records = []
for _, row in df.iterrows():
    record = {}
    for col in df.columns:
        val = row[col]

        # 处理空值
        if val in ['nan', 'NaN', 'None', 'null', ''] or pd.isna(val):
            record[col] = ""
        else:
            val = str(val).strip()

            # 特殊处理字段 year 和 age 转成数字
            if col.lower() == "year" or col.lower() == "age":
                try:
                    record[col] = int(val)
                except ValueError:
                    # 转不成功就置空
                    record[col] = ""
            else:
                # 转义字符串里的双引号 "，保留中文书名号 《》
                val = val.replace('"', '\\"')
                record[col] = val

    records.append(record)

# 写入 JSON 文件
with open("luopin.json", "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print("✅ 完成，JSON 已生成")