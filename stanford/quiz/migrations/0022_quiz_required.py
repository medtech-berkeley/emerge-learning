# Generated by Django 2.1.3 on 2019-02-11 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0021_auto_20190211_1116'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='required',
            field=models.BooleanField(default=False),
        ),
    ]
