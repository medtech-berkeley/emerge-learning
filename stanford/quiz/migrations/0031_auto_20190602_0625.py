# Generated by Django 2.2.1 on 2019-06-02 06:25

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0030_auto_20190528_0649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='badge',
            name='image',
            field=models.ImageField(null=True, storage=django.core.files.storage.FileSystemStorage(base_url='/static/', location='/static/'), upload_to='badges'),
        ),
        migrations.AlterField(
            model_name='questionmedia',
            name='media_file',
            field=models.FileField(storage=django.core.files.storage.FileSystemStorage(base_url='/static/', location='/static/'), upload_to='questions/'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='image',
            field=models.ImageField(default='category/default.jpg', null=True, storage=django.core.files.storage.FileSystemStorage(base_url='/static/', location='/static/'), upload_to='quiz_images'),
        ),
        migrations.AlterField(
            model_name='student',
            name='description',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='student',
            name='image',
            field=models.ImageField(blank=True, default='../static/accounts/profile.png', upload_to='profile_images'),
        ),
        migrations.AlterField(
            model_name='student',
            name='location',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='student',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
