# Generated by Django 5.0.3 on 2024-03-25 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0007_bikes_upload_by_cars_upload_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='bikes',
            name='vehicle_type',
            field=models.CharField(default=2, max_length=30),
            preserve_default=False,
        ),
    ]