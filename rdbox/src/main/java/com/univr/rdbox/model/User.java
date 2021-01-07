package com.univr.rdbox.model;


import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="user")
public class User {

	@Id
	private String kakaoid;

	private String nickname;

	private int isdraw;

	private String item;

	private String token;

}
