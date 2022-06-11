# Generated by Django 4.0.5 on 2022-06-09 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('created', models.DateField(auto_now_add=True, null=True, verbose_name='Дата создания')),
                ('updated', models.DateField(auto_now=True, null=True, verbose_name='Дата обновления')),
                ('username', models.CharField(max_length=255, unique=True, verbose_name='Имя пользователя')),
                ('fullname', models.CharField(blank=True, max_length=255, null=True, verbose_name='Полное имя')),
                ('email', models.CharField(blank=True, max_length=255, null=True, verbose_name='Email')),
                ('user_type', models.CharField(choices=[('admin', 'Админ'), ('manager', 'Mенеджер'), ('operator', 'Оператор')], max_length=255, verbose_name='Тип пользователя')),
                ('is_staff', models.BooleanField(default=False, verbose_name='Персонал')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активен')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='Суперпользователь')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Пользователи',
                'verbose_name_plural': 'Пользователи',
            },
        ),
    ]