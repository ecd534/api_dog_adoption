create table if not exists dog_adoption_centers (
  id serial primary key,
  name text not null,
  city text,
  state text,
  phone text,
  email text
);

insert into dog_adoption_centers (id, name, city, state, phone, email)
values (1, 'Default Adoption Center', null, null, null, null)
on conflict (id) do nothing;

create table if not exists dogs_adoption (
  id serial primary key,
  name text not null,
  age text not null,
  characteristics text not null,
  health text not null,
  gender text not null,
  size text not null,
  primary_color text not null,
  photo text,
  id_dog_adoption_center integer not null,
  breeds text not null,
  constraint fk_dogs_adoption_center
    foreign key (id_dog_adoption_center)
    references dog_adoption_centers (id)
    on update cascade
    on delete restrict
);

create index if not exists idx_dogs_adoption_center_id
  on dogs_adoption (id_dog_adoption_center);

create index if not exists idx_dogs_adoption_breeds
  on dogs_adoption (breeds);
